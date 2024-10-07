import useForm from "../../../hooks/useForm";
import Input from "../Input/Input";

// Пример реализации валидаций с использованием хука useForm()
const Form = () => {
  const { formValues, formErrors, handleInput } = useForm({
    firstName: "",
    lastName: "",
    login: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event?.preventDefault();

    console.log("formValues", formValues);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 border rounded shadow-md"
    >
      <Input
        label="firstName"
        name="firstName"
        type="text"
        value={formValues?.firstName}
        onInput={handleInput}
        error={formErrors?.firstName}
        required
      />
      <Input
        label="lastName"
        name="lastName"
        type="text"
        value={formValues?.lastName}
        onInput={handleInput}
        error={formErrors?.lastName}
        required
      />
      <Input
        label="login"
        name="login"
        type="text"
        value={formValues?.login}
        onInput={handleInput}
        error={formErrors?.login}
        required
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={formValues?.email}
        onInput={handleInput}
        error={formErrors?.email}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formValues?.password}
        onInput={handleInput}
        error={formErrors?.password}
        required
      />
      <button>Отправить</button>
    </form>
  );
};

export default Form;
