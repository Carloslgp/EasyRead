import type { ReactNode } from "react";

type ResponseBoxProps = {
    children: ReactNode;
};

function ResponseBox({ children }: ResponseBoxProps) {
    return (
        <div className="">
            {children}
        </div>
    );
}

export default ResponseBox;