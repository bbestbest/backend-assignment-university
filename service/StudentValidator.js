const Validator = use("Validator");

module.exports = async function StudentValidator(data) {
  if (typeof data !== "object") throw new Error();

  const { first_name, last_name } = data;

  const rules = {
    first_name: "required|string",
    last_name: "required|string",
  };

  const validation = await Validator.validateAll(
    {
      first_name,
      last_name,
    },
    rules
  );

  return {
    error: validation.messages(),
  };
};
