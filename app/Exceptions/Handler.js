"use strict";

const BaseExceptionHandler = use("BaseExceptionHandler");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { response, session }) {
    if (error.name === "ValidationException") {
      session.withErrors(error.messages).flashAll();
      await session.commit();
      response.redirect("back");
      return;
    }

    return super.handle(...arguments);
  }
}

module.exports = ExceptionHandler;
