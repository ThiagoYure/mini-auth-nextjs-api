import { IDD } from "@/types/IDD";

export function getCountryDDI(idd: IDD): string {
  return idd.root + idd.suffixes.join("");
}

export function formatPostalCodeByCountry(
  value: string,
  format: string
): string {
  const digits = value.replace(/\D/g, "");
  let formatted = "";
  let digitIndex = 0;

  for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
    const char = format[i];
    if (char === "#") {
      formatted += digits[digitIndex];
      digitIndex++;
    } else {
      formatted += char;
    }
  }

  return formatted;
}

export function formatPhoneByCountry(phone: string, idd: IDD): string {
  const ddi = getCountryDDI(idd).replace(/\D/g, "");
  const digits = phone.replace(/\D/g, "");

  let localDigits = digits;

  if (digits.startsWith(ddi)) {
    localDigits = digits.slice(ddi.length);
  }

  if (ddi === "55") {
    return localDigits.length <= 10
      ? localDigits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
      : localDigits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }

  if (ddi === "1") {
    return localDigits.replace(/(\d{3})(\d{3})(\d{0,4})/, "($1) $2-$3");
  }

  return `+${ddi} ${localDigits}`;
}
