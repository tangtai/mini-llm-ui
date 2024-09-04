import * as accountSchema from "./account";
import * as chatSchema from "./chat";
import * as postSchema from "./post";

export const schema = {
  ...accountSchema,
  ...chatSchema,
  ...postSchema,
};

export * from "./account";
