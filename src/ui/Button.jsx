import styled from "styled-components";

const blue = "#228be6"; // 주석 선언

const GeneralButton = styled.button`
    display: inline-flex;
    color: white;
    font-weight: bold;
    outline: none;
    border-radius: 4px;
    border: none;
    cursor: pointer;

    height: 2.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1rem;

    background: ${blue}; // 주석 사용
    &:hover {
    background: lighten(${blue}, 10%); // 색상 10% 밝게
    }

    &:active {
    background: darken(${blue}, 10%); // 색상 10% 어둡게
    }
`;

function Button(props) {
    const {buttonTitle, onClick} = props;

    return (
        <GeneralButton onClick={onClick}>
            {buttonTitle}
        </GeneralButton>
    )
}

export default Button;