import styled from "@emotion/styled";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, TextField } from "@mui/material";

interface Props {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleClickAddEvent: () => Promise<void>;
  setIsModalOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TreatmentModal = ({
  date,
  setDate,
  title,
  setTitle,
  text,
  setText,
  handleClickAddEvent,
  setIsModalOn,
}: Props) => {
  return (
    <>
      <Modal>
        <InputDiv>
          <InputBox>
            <DateDiv>
              <ModalTitle>日付</ModalTitle>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={date}
                  onChange={(newDate) => {
                    setDate(newDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </DateDiv>
            <ModalTitle>タイトル</ModalTitle>
            <InputArea
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
            <ModalTitle>診療内容</ModalTitle>

            <TextArea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <Button
              style={{ display: "block", margin: "20px auto 0px" }}
              variant="contained"
              onClick={handleClickAddEvent}
              disabled={date === null || title === "" || text === ""}
            >
              登録
            </Button>

            <Button
              style={{ display: "block", margin: "20px 0px 0px auto" }}
              variant="contained"
              onClick={() => {
                setIsModalOn(false);
              }}
            >
              閉じる
            </Button>
          </InputBox>
        </InputDiv>
      </Modal>
    </>
  );
};

const Modal = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const InputDiv = styled("div")`
  width: 700px;
  background-color: #fff;
  display; flex;
  padding: 50px 0;

  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;

const InputBox = styled("div")`
  text-align: center;
  margin: auto auto;
  width: 400px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const DateDiv = styled("div")``;

const ModalTitle = styled("p")`
  font-size: 20px;
  font-weight: bold;
`;

const InputArea = styled("input")`
  width: 230px;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const TextArea = styled("textarea")`
  width: 230px;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
