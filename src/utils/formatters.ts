export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  if (cleaned.length <= 11) {
    const match = cleaned.substring(0, 11).match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    } else {
      return cleaned.substring(0, 11);
    }
  } else if (cleaned.length === 12) {
    const match = cleaned.substring(0, 12).match(/^(\d{3})(\d{4,5})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    } else {
      return cleaned.substring(0, 12);
    }
  } else {
    const match = cleaned.substring(0, 12).match(/^(\d{2,3})(\d{9,12})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2];
    } else {
      return cleaned.substring(0, 15);
    }
  }
}

export function formatPostalCode(code: string, format: string) {
  const cleaned = ("" + code).replace(/\D/g, "");
  const codeLength = format.replace(/-/g, "").length;
  return cleaned.substring(0, codeLength);
}
