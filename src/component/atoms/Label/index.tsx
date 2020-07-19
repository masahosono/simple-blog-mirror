import styled from "styled-components";

const Required = styled.label`
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
    :after {
        color: red;
        content: '*';
        padding-left: 5px;
    }
`;
const NonRequired = styled.label`
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
`;

interface Props {
    type?: string;
    text: string;
    required?: boolean;
}

const RequiredLabel = (props: Props) => {
    return props?.required
        ? <Required>{props.text}</Required>
        : <NonRequired>{props.text}</NonRequired>;
}

export default RequiredLabel;