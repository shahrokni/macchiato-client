import { Expression } from "./logical-expression";
export default class FieldExpression{
    fieldName:string | undefined;
    fieldValue:string | undefined;
    expression:Expression | undefined;
}