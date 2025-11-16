import {
  validateId,
  validatePassword,
  validateLoginForm,
  validateCredentials,
} from '../utils/validation'

describe('Validation Utilities', () => {
  describe('validateId', () => {
    it('should return error for empty id', () => {
      expect(validateId('')).toBe('필수 입력항목입니다')
    })

    it('should accept valid id format', () => {
      expect(validateId('admin')).toBeNull()
      expect(validateId('user123')).toBeNull()
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
      expect(errors.id).toBeDefined()
      expect(errors.password).toBeDefined()
    })

    it('should return error for short password', () => {
      const errors = validateLoginForm('admin', 'short')
      expect(errors.password).toBeDefined()
      expect(errors.id).toBeUndefined()
    })

    it('should return no errors for valid inputs', () => {
      const errors = validateLoginForm('admin', 'validpassword')
      expect(Object.keys(errors).length).toBe(0)
    })
  })

  describe('validateCredentials', () => {
    it('should return true for admin/admin1234', () => {
      expect(validateCredentials('admin', 'admin1234')).toBe(true)
    })

    it('should return false for incorrect id', () => {
      expect(validateCredentials('wrongid', 'admin1234')).toBe(false)
    })

    it('should return false for incorrect password', () => {
      expect(validateCredentials('admin', 'wrongpassword')).toBe(false)
    })

    it('should return false for both incorrect', () => {
      expect(validateCredentials('wrong', 'wrong')).toBe(false)
    })
  })
})
