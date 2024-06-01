import { ReactNode } from "react";
import { BodySectionLayout, BottomSectionLayout, ButtonLayout, ModalLayout, ModalWrapperLayout, TopSectionLayout } from "./style";

interface SystemModalModalProps {
    label: string;
    open?: boolean;
    closeModal: () => void;
    children: ReactNode;
}

export const SystemModal = ({ label, open = false, closeModal, children }: SystemModalModalProps) => {


    return (
        <>
            {open && <ModalWrapperLayout>
                <ModalLayout>
                    <TopSectionLayout>
                        <div>
                            {label}
                        </div>
                        <img src="nanosoft.svg" alt="screens logo" />
                    </TopSectionLayout>
                    <BodySectionLayout>
                        {children}
                    </BodySectionLayout>
                    <BottomSectionLayout>
                        <ButtonLayout onClick={closeModal}>
                            Cancel
                        </ButtonLayout>
                    </BottomSectionLayout>
                </ModalLayout>
            </ModalWrapperLayout>}
        </>
    )
}