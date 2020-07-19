import React from 'react';
import styled from 'styled-components';

export interface Props {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

// NOTE: propsを含める書き方

// const Component = styled.div<{
//     isShown: boolean;
// }>`
//     display: ${props => (props.isShown ? 'block' : 'none')};
//     position: fixed;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;
// `;

const Component = styled.aside`
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

const ModalBackground = styled.div`
    display:flex;
    background: rgba(0,0,0,0.8);
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
`;

const Modal: React.FC<Props> = ({
    children,
    onClick
}): React.ReactElement => {
    return (
        <>
            <Component>
                <ModalBackground onClick={onClick} />
                {children}
            </Component>
        </>
    );

}
export default Modal;