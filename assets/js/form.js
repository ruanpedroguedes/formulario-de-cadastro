class ValidaFormulario {
    constructor() {
      this.formulario = document.querySelector('.form');
      this.eventos();
    }
  
    eventos() {
      this.formulario.addEventListener('submit', e => {
        this.handleSubmit(e);
      });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const camposValidos = this.camposSaoValidos();
      const senhasValidas = this.senhasSaoValidas();
  
      if(camposValidos && senhasValidas) {
        alert('Formulário enviado.');
        // Se o formulário for válido, você pode enviar os dados aqui.
        // Exemplo: this.enviarDados();
      }
    }
  
    senhasSaoValidas() {
      let valid = true;
  
      const senha = this.formulario.querySelector('#password');
      const repetirSenha = this.formulario.querySelectorAll('[placeholder="Repetir Senha"]')[0];
  
      if(senha.value !== repetirSenha.value) {
        valid = false;
        this.criaErro(senha, 'Campos senha e repetir senha precisam ser iguais.');
        this.criaErro(repetirSenha, 'Campos senha e repetir senha precisam ser iguais.');
      }
  
      if(senha.value.length < 6 || senha.value.length > 12) {
        valid = false;
        this.criaErro(senha, 'Senha precisa ter entre 6 e 12 caracteres.');
      }
  
      return valid;
    }
  
    camposSaoValidos() {
      let valid = true;
  
      for(let errorText of this.formulario.querySelectorAll('.error-text')) {
        errorText.remove();
      }
  
      for(let campo of this.formulario.querySelectorAll('.input')) {
        const label = campo.placeholder;
  
        if(!campo.value.trim()) {
          this.criaErro(campo, `Campo "${label}" não pode estar em branco.`);
          valid = false;
        }
  
        if(campo.classList.contains('input--cpf')) {
          if(!this.validaCPF(campo)) valid = false;
        }
  
        // Aqui você pode adicionar mais validações de acordo com suas necessidades
  
      }
  
      return valid;
    }
  
    validaCPF(campo) {
      const cpf = new ValidaCPF(campo.value);
  
      if(!cpf.valida()) {
        this.criaErro(campo, 'CPF inválido.');
        return false;
      }
  
      return true;
    }
  
    criaErro(campo, msg) {
      const div = document.createElement('div');
      div.innerHTML = msg;
      div.classList.add('error-text');
      campo.parentNode.insertBefore(div, campo.nextSibling);
    }
  }
  
  const valida = new ValidaFormulario();
  