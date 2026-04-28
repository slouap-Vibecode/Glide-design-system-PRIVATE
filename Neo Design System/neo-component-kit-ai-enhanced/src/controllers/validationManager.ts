import { ValidationRule } from "@/models/validationRule";
import { defineRule } from "vee-validate";
import { required } from "@vee-validate/rules";
import { GlobalOptionsProvider } from "./globalOptionsProvider";
import { ValidationKeyManager } from "./validationKeyManager";

export class ValidationManager {
  private static requiredRuleCreated: boolean;

  public static createRequiredRuleIfDoesntExist() {
    if (!this.requiredRuleCreated) {
      const requiredWording = GlobalOptionsProvider.getInstance().getOptions()?.translations?.requiredField;
      if (requiredWording) {
        defineRule("required", (value: unknown) => {
          if (required(value)) {
            return true;
          }
          return requiredWording; // your custom message
        });
        this.requiredRuleCreated = true;
      } else {
        throw new Error(
          "Error: if you use a form field component (such as NckInputText for instance), you need to provide translation for 'requiredField'",
        );
      }
    }
  }

  public static getRuleNames(rules: ValidationRule[], ruleKeys: string[], isInputRequired: boolean): string {
    let rulesArray: string[] = [];
    if (rules) {
      rulesArray = ruleKeys.map((rule) => rule);
    }
    if (isInputRequired) {
      rulesArray.push("required");
    }
    return rulesArray.join("|");
  }

  public static createRules(rules: ValidationRule[]) {
    const ruleKeys: string[] = [];
    (rules ?? []).forEach((rule) => {
      const key = ValidationKeyManager.getKey();
      defineRule(key, (value, _, ctx) => {
        // behavior from vee-validate@3
        const isTruthy = Boolean(value);
        let relatedValue: Record<string, unknown> | undefined;

        if (rule.relatedFieldName && ctx.form) {
          relatedValue = { [rule.relatedFieldName]: ctx.form[rule.relatedFieldName] };
        }

        if (!isTruthy || rule.validator(value, relatedValue)) {
          return true;
        }
        return rule.errorMessage; // your custom message
      });

      ruleKeys.push(key);
    });
    return ruleKeys;
  }
}
