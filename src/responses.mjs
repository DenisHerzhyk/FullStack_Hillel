import { rootResponse } from "./responses/rootResponse.mjs";
import { userResponse } from "./responses/userResponse.mjs";
import {articleResponse} from "./responses/articleResponse.mjs"

const responses = (app) => {
    rootResponse(app);
    userResponse(app);
    articleResponse(app);
}

export {responses}