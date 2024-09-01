import * as accountSchema from "./account";
import * as chatSchema from "./chat";

export const schema = {
  ...accountSchema,
  ...chatSchema,
};

export * from "./account";
