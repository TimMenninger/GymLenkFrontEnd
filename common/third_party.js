//
// Copied from: https://stackoverflow.com/questions/30058927/format-a-phone-number-as-a-user-types-using-pure-javascript
//

function isNumericInput(event) {
  const key = event.keyCode;
  return ((key >= 48 && key <= 57) || // Allow number line
    (key >= 96 && key <= 105) // Allow number pad
  );
};

function isModifierKey(event) {
  const key = event.keyCode;
  return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
    (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
    (key > 36 && key < 41) || // Allow left, up, right, down
    (
      // Allow Ctrl/Command + A,C,V,X,Z
      (event.ctrlKey === true || event.metaKey === true) &&
      (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
    )
};

function enforceFormat(event) {
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  if (!isNumericInput(event) && !isModifierKey(event)) {
    event.preventDefault();
  }
};

function formatToPhone(event) {
  if (isModifierKey(event)) {
    return;
  }

  let target = event.target;
  if (target != null) {
      let input = ('' + target.value).replace(/\D/g, ''); // First ten digits of input only
      let formatted = formatPhoneNumber(input);
      target.value = `${formatted}`;
  }
};

function formatPhoneNumber(input) {
  // Check if the input is of correct
  let offset = 0;
  let intlCode = '';
  let match = input.match(/^(1|)?(\d{0,10})$/);

  if (match && match[1]) {
    // Remove the matched extension code
    // Change this to format for any country code.
    intlCode = '+1 ';
    offset = 1;
  }

  let area = input.substring(0 + offset, 3 + offset);
  let middle = input.substring(3 + offset, 6 + offset);
  let last = input.substring(6 + offset, 10 + offset);

  if (input.length > 10+offset) {
    return input;
  } else if (input.length > 6+offset) {
    return intlCode + "(" + area + ") " + middle + "-" + last;
  } else if (input.length > 3+offset) {
    return intlCode + "(" + area + ") " + middle;
  } else if (input.length > 0+offset) {
    return intlCode + "(" + area;
  } else {
    return input;
  }
};

