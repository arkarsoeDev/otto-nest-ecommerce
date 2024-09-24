export class DomainError extends Error {
  constructor(public status, ...params) {
    super(...params)
  }
}
