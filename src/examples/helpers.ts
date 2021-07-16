export const HTTP_PORT = 3000;

export function sayHello() {
  console.log("Hello, Michael!");
}

/**
 * Documentation for Person
 */
export class Person {
  /**
   * constructor documentation
   * @param {string} name - The name of the employee.
   */
  constructor(name: Person["name"]) {}
  name: string;
}
