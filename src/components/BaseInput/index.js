import React, {
  useImperativeHandle,
  forwardRef,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {TextInput, Keyboard, Animated, View, Text} from 'react-native';
//libs
import {ScaledSheet} from 'react-native-size-matters';
import PropTypes from 'prop-types';
// utils
import {colors} from 'utils/Colors';
import validator from 'utils/Validators';

const Input = (props, ref) => {
  const {
    value = '',
    inputType = '',
    errorText = '',
    placeholder = '',
    multiline = false,
    autoCorrect = false,
    secureTextEntry = false,
    validateWhenBlur = true,
    selectTextOnFocus = true,
    blurOnSubmit = true,
    editable = true,
    maxLength = 32,
    keyboardType = null,
    ownValidator = null,
    validatorType = 'required',
    returnKeyType = 'next',
    autoCapitalize = 'none',
    placeholderTextColor = colors.inputTextGrey,
    selectionColor = colors.inputTextGrey,
    onSubmitEditing = () => Keyboard.dismiss(),
    onValueChanged = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onChange = () => {},
    style = {},
    stylesMain = {},
  } = props;

  const inputRef = useRef(null);
  const textAnim = useRef(new Animated.Value(0)).current;

  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setText(value);
  }, [value]);

  useImperativeHandle(ref, () => ({
    getValue: () => text,
    isError: () => error,
    setValue: text => setText(text),
    clear: () => setText(''),
    focus: () => inputRef.current.focus(),
    makeValidation: () => makeValidation(),
    error: () => setError(true),
  }));

  const makeValidation = () => {
    const isError = ownValidator
      ? ownValidator(text)
      : validator[validatorType](text);

    setError(isError);
    isError && setEditing(false);
    return isError;
  };

  const _onChangeText = useCallback(
    text => {
      let value = text;

      if (inputType === 'phone-number') {
        value = text.replace(/[^0-9]/g, '');
      }

      if (validatorType === 'email') {
        value = text.trim();
      }
      value !== text && onValueChanged(value);

      if (value.length) {
        setEditing(true);
      } else {
        setEditing(false);
      }

      setText(value);
    },
    [inputType, onValueChanged, validatorType],
  );

  const _onFocus = () => {
    onFocus();
    handleAnimation(1);
  };

  const _onBlur = () => {
    onBlur(text.trim());
    handleAnimation(0);
    validateWhenBlur && makeValidation();
  };

  // STYLES START
  const handleAnimation = toValue => {
    Animated.timing(textAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const getPrimaryColor = error ? colors.inputErrorBorder : colors.gray;

  const borderStyle = {
    borderColor: getPrimaryColor,
  };
  // STYLES END

  const renderErrorText = () => {
    if (!error || !errorText) {
      return <View style={{height: 20}} />;
    }

    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.mainContainer, stylesMain]}>
      <TextInput
        ref={inputRef}
        value={text}
        multiline={multiline}
        onChangeText={_onChangeText}
        placeholder={placeholder}
        maxLength={maxLength}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        selectionColor={selectionColor}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        editable={editable}
        onChange={onChange}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        selectTextOnFocus={selectTextOnFocus}
        blurOnSubmit={blurOnSubmit}
        placeholderTextColor={placeholderTextColor}
        onBlur={_onBlur}
        onFocus={_onFocus}
        style={[
          styles.input,
          editing && {backgroundColor: colors.lightGray},
          borderStyle,
          style,
        ]}
      />
      {renderErrorText()}
    </View>
  );
};

const styles = ScaledSheet.create({
  errorContainer: {
    alignItems: 'center',
    marginTop: '5@ms',
  },
  errorText: {
    color: colors.inputErrorText,
    fontSize: '11@ms',
    paddingHorizontal: '15@ms',
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: '10@ms',
    borderWidth: '2@ms',
    color: colors.inputTextBlack,
    fontFamily: 'Poppins-Regular',
    fontSize: '14@ms',
    paddingLeft: '18@ms',
    paddingRight: '12@ms',
    paddingVertical: '15@ms',
  },
  mainContainer: {
    width: '100%',
  },
});

Input.PropTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  inputType: PropTypes.string,
  errorText: PropTypes.string,
  multiline: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  validateWhenBlur: PropTypes.bool,
  selectTextOnFocus: PropTypes.bool,
  blurOnSubmit: PropTypes.bool,
  editable: PropTypes.bool,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  ownValidator: PropTypes.func,
  validatorType: PropTypes.string,
  returnKeyType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  selectionColor: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  onValueChanged: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  style: PropTypes.object,
  stylesMain: PropTypes.object,
};

export default forwardRef(Input);
