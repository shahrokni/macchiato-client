import FieldExpression from "./filter-field-expression";
export default interface IFilter {   
    pageNumber: number|undefined;
    fieldsExpression:FieldExpression[]|undefined;
}