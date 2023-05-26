import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const SignUpPage = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Implement your login logic here
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input l="Email" type="email" />
        <Input l="name" type="text" />
        <Input l="Passcode" type="password" />
        <Button onClick = {handleSubmit} btn = "SignUp" />
      </form>
    </FormContainer>
  );
};

export default SignUpPage;
