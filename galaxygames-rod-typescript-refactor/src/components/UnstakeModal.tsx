import React from "react";
import Modal from "react-modal";
import { Container } from "./Container";
import { CoralButton } from "./CoralButton";

type IUnstakeModal = {
  modalIsOpen: boolean;
  onClick: (ev?: MouseEvent) => void;
  loading: boolean;
  closeModal: () => void;
};
export const UnstakeModal: React.FunctionComponent<IUnstakeModal> = ({
  modalIsOpen,
  onClick,
  loading,
  closeModal,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          border: "none",
          background: "transparent",
        },
      }}
      contentLabel="Mint & Stake Modal"
      onRequestClose={closeModal}>
      <Container>
        <div className="w-full flex flex-col items-center overflow-hidden" style={{ zIndex: 1000 }}>
          <div className="font-console text-2xl drop-text text-center">REMINDER</div>
          <div className="font-console text-center" style={{ maxWidth: "500px" }}>
            You pay 0% tax when unstaking your Colonist and your Colonist are returned to your
            wallet.
            <br />
            <br />
            <span className="text-red">HOWEVER</span>
            <br />
            <br />
            Each Colonist you unstake has a 50% chance of having{" "}
            <span className="text-red">ALL</span> their $EON stolen by Pirates that are prowling the
            mining operations. This chance is rerolled for every Colonist you unstake.
          </div>
          <CoralButton
            title={"HARVEST $EON AND UNSTAKE"}
            width={250}
            height={80}
            onClick={onClick}
            loading={loading}
            fontSize={20}
          />
        </div>
      </Container>
    </Modal>
  );
};
