import { SSTConfig } from "sst";
import { Api } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "sst-rust",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "rust",
    });
    app.stack(function Stack({ stack }) {
      const api = new Api(stack, "api", {
        routes: {
          "POST /": "functions/lambda/main.rs",
        },
      });
      stack.addOutputs({
        ApiEndpoint: api.url,
      });
    });
  },
} satisfies SSTConfig;