import {showMessage} from 'react-native-flash-message';
import {emailFormat, passwordFormat} from '../services/validations';

const useValidation = () => {
  const validatePassword = password => {
    if (!passwordFormat.test(password)) {
      showMessage({
        message:
          'Password must contain at least 8 characters, 1 number, 1 uppercase and 1 lowercase letter',
        type: 'danger',
      });

      return false;
    }

    return true;
  };

  const validateTwoPasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      showMessage({
        message: 'Passwords do not match',
        type: 'danger',
      });

      return false;
    }

    return true;
  };

  const validateEmail = email => {
    if (!emailFormat.test(email)) {
      showMessage({
        message: 'Invalid email, Please enter a valid email address',
        type: 'danger',
      });

      return false;
    }

    return true;
  };

  const validateFeedback = feedback => {
    if (feedback.length < 10) {
      showMessage({
        message: 'Feedback must be at least 10 characters',
        type: 'danger',
      });

      return false;
    }

    return true;
  };

  const validateName = name => {
    if (name.length < 3 || name.length > 20) {
      showMessage({
        message: 'Name must be at least 3 characters',
        type: 'danger',
      });

      return false;
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      showMessage({
        message: 'Name must contain only alphabets',
        type: 'danger',
      });

      return false;
    }

    return true;
  };

  const validateOtp = otp => {
    if (otp.length < 4) {
      showMessage({
        message: 'OTP is required',
        type: 'danger',
      });

      return false;
    }

    //check of its number
    if (!/^[0-9]+$/.test(Number(otp))) {
      showMessage({
        message: 'OTP is required',
        type: 'danger',
      });

      return false;
    }

    return true;
  };

  const ValidateName = name => {
    if (name.length < 3 || name.length > 20) {
      showMessage({
        message: 'Name must be at least 3 characters',
        type: 'danger',
      });

      return false;
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      // name should contain only alphabets and spaces
      showMessage({
        message: 'Name must contain only alphabets',
        type: 'danger',
      });

      return false;
    }

    return true;
  };

  const validateUserName = username => {
    console.log('username', username);
    if (username.length < 3 || username.length > 20) {
      showMessage({
        message: 'Username must be at least 3 characters',
        type: 'danger',
      });

      return false;
    } else if (
      /^[a-zA-Z]+(?:[a-zA-Z0-9]*_?[a-zA-Z0-9]*)*$/.test(username) === false
    ) {
      showMessage({
        message:
          'Username must contain only letters, numbers, and underscores.',
        description:
          'The username must start with a letter , and you can include numbers and an optional underscore.',
        type: 'danger',
      });

      return false;
    }

    return true;
  };

  const validateArraysId = (ids = []) => {
    if (ids.length < 1) {
      showMessage({
        message: 'Please select at least one item',
        type: 'danger',
      });
      return false;
    }
    return true;
  };

  const validatePrompt = prompt => {
    if (prompt.length < 100) {
      showMessage({
        message: 'Prompt must be at least 100 characters',
        type: 'danger',
      });
      return false;
    } else if (prompt.length > 350) {
      showMessage({
        message: 'Prompt must be at most 350 characters',
        type: 'danger',
      });
      return false;
    }
    return true;
  };

  const validateReview = (rating, review) => {
    if (rating === 0) {
      showMessage({
        message: 'Please rate the product',
        type: 'danger',
      });
      return false;
    } else if (review.length < 10) {
      showMessage({
        message: 'Review must be at least 10 characters',
        type: 'danger',
      });
      return false;
    }
    return true;
  };

  const validatePostText = postText => {
    if (postText.length < 10) {
      showMessage({
        message: 'Post must be at least 10 characters',
        type: 'danger',
      });
      return false;
    }
    return true;
  };
  return {
    validatePassword,
    validateTwoPasswords,
    validateEmail,
    validateFeedback,
    validateName,
    validateOtp,
    validatePrompt,
    validateUserName,
    validateArraysId,
    validateReview,
    validatePostText,
  };
};
export default useValidation;
