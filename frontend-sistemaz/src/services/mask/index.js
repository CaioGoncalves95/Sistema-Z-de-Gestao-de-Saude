export function formatCPF(cpf) {
  let formattedCPF = cpf.replace(/\D/g, "");
  formattedCPF = formattedCPF.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/g,
    "$1.$2.$3-$4"
  );
  return formattedCPF;
}

export function formatPhone(phoneNumber) {
  let formattedPhone = phoneNumber.replace(/\D/g, "");
  if (formattedPhone.length === 13) {
    //+99 99 99999-9999
    formattedPhone = formattedPhone.replace(
      /(\d{2})(\d{2})(\d{5})(\d{4})/g,
      "+$1 ($2) $3-$4"
    );
  } else if (formattedPhone.length === 12) {
    //+99 99 9999-9999
    formattedPhone = formattedPhone.replace(
      /(\d{2})(\d{2})(\d{4})(\d{4})/g,
      "+$1 ($2) $3-$4"
    );
  } else if (formattedPhone.length === 11) {
    // (99) 9-9999-9999
    formattedPhone = formattedPhone.replace(
      /(\d{2})(\d{1})(\d{4})(\d{4})/g,
      "($1) $2-$3-$4"
    );
  } else if (formattedPhone.length === 10) {
    // 99 9999-9999
    formattedPhone = formattedPhone.replace(
      /(\d{2})(\d{4})(\d{4})/g,
      "($1) $2-$3"
    );
  } else if (formattedPhone.length === 9) {
    // 99999-9999
    formattedPhone = formattedPhone.replace(/(\d{5})(\d{4})/g, "$1-$2");
  } else if (formattedPhone.length === 8) {
    // 9999-9999
    formattedPhone = formattedPhone.replace(/(\d{4})(\d{4})/g, "$1-$2");
  }

  return formattedPhone;
}
