import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-top: 0;
  padding-bottom: 2rem;
  /* width: 85vw;
  max-width: 1152px; */
  width: 100vw;
  max-width: 1152px;

  > main {
    display: flex;
    flex-direction: column;

    .page__header {
      margin-top: 1rem;
      /* min-height: 90px; */
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: row;

      > .page__header__right {
        position: absolute;
        right: 0;
        top: 0;
        margin-right: 1rem;
      }
    }
    h2.mainmarktext {
      color: #fbb954;
      text-align: center;
      padding: 3rem;
      font-size: 19px;
      text-shadow: 1px 1px 2px black;
    }
  }

  .page__row {
    display: flex;
    flex-direction: row;
    padding: 1rem 2rem;
    @media only screen and (max-width: 1024px) {
      flex-direction: column;
      padding: 0.5rem 1rem;
    }
  }

  @media only screen and (max-width: 768px) {
    > main {
      .page__header {
        flex-direction: column;
        > .page__header__right {
          position: relative;
        }
      }
    }
  }
`;
