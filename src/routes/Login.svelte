<script>
  import { enhance } from "$app/forms";
  import Title from "$lib/components/Title.svelte";
</script>

<div class="login">
  <Title />

  <form method="POST" use:enhance>
    <input type="text" name="handle" required placeholder="블루스카이 핸들" />
    <button type="submit" class="login">로그인</button>
  </form>
</div>

<style>
  .login {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    font-size: 1.06rem;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  input {
    box-sizing: border-box;
    height: 50px;
    padding-left: 12px;
    background-color: var(--white);
    border: 2px solid var(--gray1);
    border-radius: 4px;
  }

  input:focus {
    border-color: var(--primary);
    outline: none;
  }

  input:user-invalid {
    border-color: var(--error);
  }
  input::placeholder {
    color: var(--gray3);
  }

  button.login {
    margin-top: 4px;
    height: 50px;
    background-color: var(--primary);
    color: var(--white);
    border: none;
    border-radius: 16px;
    font-size: 1.12rem;
    font-weight: 600;
  }
</style>
