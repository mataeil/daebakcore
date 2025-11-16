import {
  validateEmail,
  validatePassword,
  validateLoginForm,
  validateCredentials,
} from '../utils/validation'

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should return error for empty email', () => {
      expect(validateEmail('')).toBe('필수 입력항목입니다')
    })

    it('should return error for invalid email format', () => {
      expect(validateEmail('invalid-email')).toBe('올바른 이메일 형식을 입력하세요')
      expect(validateEmail('test@')).toBe('올바른 이메일 형식을 입력하세요')
      expect(validateEmail('@example.com')).toBe('올바른 이메일 형식을 입력하세요')
    })

    it('should accept valid email format', () => {
      expect(validateEmail('admin@example.com')).toBeNull()
      expect(validateEmail('test.user@domain.co.kr')).toBeNull()
    })
  })

  describe('validatePassword', () => {
    it('should return error for empty password', () => {
      expect(validatePassword('')).toBe('필수 입력항목입니다')
    })

    it('should return error for password shorter than 8 characters', () => {
      expect(validatePassword('1234567')).toBe('비밀번호는 최소 8자 이상이어야 합니다')
      expect(validatePassword('short')).toBe('비밀번호는 최소 8자 이상이어야 합니다')
    })

    it('should accept password of 8 or more characters', () => {
      expect(validatePassword('12345678')).toBeNull()
      expect(validatePassword('longerpassword')).toBeNull()
    })
  })

  describe('validateLoginForm', () => {
    it('should return errors for empty fields', () => {
      const errors = validateLoginForm('', '')
      expect(errors.email).toBeDefined()
      expect(errors.password).toBeDefined()
    })

    it('should return error for invalid email', () => {
      const errors = validateLoginForm('invalid', 'validpassword123')
      expect(errors.email).toBe('올바른 이메일 형식을 입력하세요')
      expect(errors.password).toBeUndefined()
    })

    it('should return error for short password', () => {
      const errors = validateLoginForm('test@example.com', 'short')
      expect(errors.password).toBeDefined()
      expect(errors.email).toBeUndefined()
    })

    it('should return no errors for valid inputs', () => {
      const errors = validateLoginForm('admin@example.com', 'validpassword')
      expect(Object.keys(errors).length).toBe(0)
    })
  })

  describe('validateCredentials', () => {
    it('should return true for admin/admin1234', () => {
      expect(validateCredentials('admin', 'admin1234')).toBe(true)
    })

    it('should return false for incorrect email', () => {
      expect(validateCredentials('wrongemail', 'admin1234')).toBe(false)
    })

    it('should return false for incorrect password', () => {
      expect(validateCredentials('admin', 'wrongpassword')).toBe(false)
    })

    it('should return false for both incorrect', () => {
      expect(validateCredentials('wrong', 'wrong')).toBe(false)
    })
  })
})
