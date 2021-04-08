var hints = [{id: "baye2a-h1", type: "hint", dependencies: [], title: "Bayes' Theorem", text: "The probability of event A given event B may be computed by means of the following formula: P(A$$\mid$$B)=P(A)P(B$$\mid$$A)/P(B)"}, {id: "baye2a-h2", type: "scaffold", problemType: "TextBox", answerType: "arithmetic", hintAnswer: ["0.100"], dependencies: ["baye2a-h1"], title: "P(Rain)", text: "What is the probability that it will rain on any given day this month? Round your answer to three decimal places", subHints: [{id: "baye2a-h2-s1", type: "hint", dependencies: [], title: "P(Rain)", text: "Usually only 10% of days are rainy this month. Thus the probability that it will rain on any given day this month is 0.100"}]}, {id: "baye2a-h3", type: "scaffold", problemType: "TextBox", answerType: "arithmetic", hintAnswer: ["0.500"], dependencies: ["baye2a-h2"], title: "P(Cloud$$\mid$$Rain)", text: "What is the probability that the day starting off cloudy given that it was rainy? Round your answer to three decimal places", subHints: [{id: "baye2a-h3-s1", type: "hint", dependencies: [], title: "P(Cloud$$\mid$$Rain)", text: "50% of rainy days start off cloudy. Thus the probability of a cloudy morning, given that it is a rainy day, is 0.500"}]}, {id: "baye2a-h4", type: "scaffold", problemType: "TextBox", answerType: "arithmetic", hintAnswer: ["0.400"], dependencies: ["baye2a-h3"], title: "P(Cloud)", text: "What is the probability that any given morning is cloudy? Round your answer to three decimal places", subHints: [{id: "baye2a-h4-s1", type: "hint", dependencies: [], title: "P(Cloud)", text: "Cloudy mornings occur 40% of the time. Thus the probability of there being a cloudy morning on any given day is 0.400"}]}, {id: "baye2a-h5", type: "hint", dependencies: ["baye2a-h4"], title: "P(Rain$$\mid$$Cloud)", text: "Using Bayes' Theorem, calculate P(Rain$$\mid$$Cloud) using P(Rain), P(Cloud$$\mid$$Smoke), and P(Cloud)"}, {id: "baye2a-h6", type: "hint", dependencies: ["baye2a-h5"], title: "P(Rain$$\mid$$Cloud)", text: "P(Rain$$\mid$$Cloud)=P(Rain)P(Cloud$$\mid$$Rain)/P(Cloud)=0.1*0.5/0.4, so the probability that today will be rainy, given that it is cloudy, is 0.125"}, ]; export {hints};