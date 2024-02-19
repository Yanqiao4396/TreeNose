class MessageChain {
  constructor(message) {
      this.message = message;
  }

  capitalize() {
      this.message = this.message.toUpperCase();
      return this;
  }

  addExclamation() {
      this.message += '!';
      return this;
  }

  reverse() {
      this.message = this.message.split('').reverse().join('');
      return this;
  }

  display() {
      console.log(this.message);
      return this;
  }
}

// Example usage of the message chain
const myMessage = new MessageChain('hello');

myMessage.capitalize().addExclamation(1).reverse(4,5,6).display("wpw").wow();
myMessage.capitalize().addExclamation().reverse("wow").display();