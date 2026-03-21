<button class="menu-button">
  <img src="/icons/menu.svg" alt="menu" />
</button>

<h1 class="title">ALTSky</h1>

<div class="write">무슨 일이 일어나고 있나요?</div>

<div class="buttons">
  <button><img src="/icons/image.svg" alt="icon" />사진 업로드</button>
  <button><img src="icons/link.svg" alt="link" />게시물 보기</button>
</div>

<style>
  .menu-button {
    position: fixed;
    left: 10px;
    top: 10px;
    background: none;
    border: none;
    padding: 2px;
  }

  .title {
    font-family: "Lalezar";
    font-size: 3rem;
    color: var(--primary);
    margin: 0.2em 0;
    user-select: none;
  }

  .write {
    width: 100%;
    height: 120px;
    border: 1.5px solid var(--primary);
    border-radius: 16px;
    box-sizing: border-box;
    padding: 20px;
  }

  .buttons {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: stretch;
    gap: 8px;

    & > button {
      flex: 1;
      border-radius: 16px;
      font-weight: 500;
      inset: unset;
      border: none;
      background-color: var(--primary);
      color: var(--white);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 4px;
    }
  }
</style>
