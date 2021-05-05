//
// Copied from: https://learnersbucket.com/examples/javascript/how-to-format-phone-number-in-javascript/
//
let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');

    //Check if the input is of correct
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        //Remove the matched extension code
        //Change this to format for any country code.
        let intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }

    return null;
}

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

  // I am lazy and don't like to type things more than once
  let target = event.target;
  let input = ('' + event.target.value).replace(/\D/g, ''); // First ten digits of input only

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

  if (input.length > 6) {
    target.value = `${intlCode}(${area}) ${middle}-${last}`;
  } else if (input.length > 3) {
    target.value = `${intlCode}(${area}) ${middle}`;
  } else if (input.length > 0) {
    target.value = `${intlCode}(${area}`;
  }

  //Filter only numbers from the input
  let cleaned = ('' + event.target.value).replace(/\D/g, '');
  let formatted = cleaned;

  //Check if the input is of correct
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    //Remove the matched extension code
    //Change this to format for any country code.
    let intlCode = (match[1] ? '+1 ' : '')
    formatted = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }

  target.value = `${formatted}`
};

