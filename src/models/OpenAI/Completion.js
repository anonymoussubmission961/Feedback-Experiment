import { BadRequestError, UnauthorizedError } from "../../errors";
import { COMPLETION_MODELS } from "./completionModels";
import parse from "../../util/parse";

class Completion {
    constructor(config, addChunkCallback, setFinishedCallback) {
        if (!COMPLETION_MODELS.includes(config.model)) {
            throw new BadRequestError(`
        Unknown model. 
        Check the spelling of your input.
        If you feel this is an error, open an issue on our Github repo:
      `);
        }
        this.addChunkCallback = addChunkCallback;
        this.setFinishedCallback = setFinishedCallback;
        this.decoder = new TextDecoder("utf-8");
        this.API_URL = "https://api.openai.com/v1/chat/completions";

        // API params
        this.model = config.model;
        this.suffix = config.suffix || null;
        this.maxTokens = config.maxTokens || 16;
        this.temperature = config.temperature || 1;
        this.topP = config.topP || 1;
        this.n = config.n || 1;
        this.logprobs = config.logprobs || null;
        this.echo = config.echo || false;
        this.stop = config.stop || null;
        this.presencePenalty = config.presencePenalty || 0;
        this.frequencyPenalty = config.frequencyPenalty || 0;
        this.bestOf = config.bestOf || 1;
        this.logitBias = config.logitBias || {};
        this.user = config.user || "";
    }

    static apiKey;

    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    updateParam(id, newValue) {
        if (!this[id]) {
            throw new BadRequestError(`No such param. `);
        }
        this[id] = newValue;
    }

    async createResponse(prompt) {
        try {
            const reader = await this._callOpenAI(prompt);

            let isStreaming = true;
            while (isStreaming) {
                const { done, value } = await reader.read();
                done ? (isStreaming = false) : this._addValue(value);
            }
            this.setFinishedCallback();
        } catch (e) {
            console.error(e);
        }
    }

    async _callOpenAI(prompt) {
        if (!this.apiKey) {
            throw new UnauthorizedError(
                "No API Key has been set! Get your OpenAI API key and pass it into the setApiKey function"
            );
        }
        const params = this._getApiParams();
        const response = await fetch(this.API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                ...params,
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a helpful assistant providing hints to a student.",
                    },
                    { role: "user", content: prompt },
                ],
                stream: true,
            }),
        });
        return response.body.getReader();
    }

    _addValue(value) {
        const decodedChunk = this.decoder.decode(value);
        const lines = parse(decodedChunk);

        let chunk = "";
        for (let line of lines) {
            const { content } = line.choices[0].delta;
            if (content) {
                this.addChunkCallback(content);
                chunk += content;
            }
        }
        return chunk;
    }

    _getApiParams() {
        return {
            model: this.model,
            max_tokens: this.maxTokens,
            temperature: this.temperature,
        };
    }
}

export default Completion;
