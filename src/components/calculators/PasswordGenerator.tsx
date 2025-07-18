import React, { useState } from 'react';
import { Shield, Copy, RefreshCw } from 'lucide-react';

const PasswordGenerator = () => {
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeSimilar, setExcludeSimilar] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const similarChars = 'il1Lo0O';

  const generatePassword = () => {
    let charset = '';
    
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;
    
    if (excludeSimilar) {
      charset = charset.split('').filter(char => !similarChars.includes(char)).join('');
    }
    
    if (charset === '') {
      setPassword('Please select at least one character type');
      return;
    }
    
    let result = '';
    
    // Ensure at least one character from each selected type
    if (includeUppercase) result += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    if (includeLowercase) result += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    if (includeNumbers) result += numberChars[Math.floor(Math.random() * numberChars.length)];
    if (includeSymbols) result += symbolChars[Math.floor(Math.random() * symbolChars.length)];
    
    // Fill the rest randomly
    for (let i = result.length; i < length; i++) {
      result += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Shuffle the result
    result = result.split('').sort(() => Math.random() - 0.5).join('');
    
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password');
    }
  };

  const getPasswordStrength = () => {
    if (!password || password.length < 8) return { strength: 'Weak', color: 'text-red-600', score: 1 };
    
    let score = 0;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score <= 2) return { strength: 'Weak', color: 'text-red-600', score };
    if (score <= 3) return { strength: 'Fair', color: 'text-yellow-600', score };
    if (score <= 4) return { strength: 'Good', color: 'text-blue-600', score };
    return { strength: 'Strong', color: 'text-green-600', score };
  };

  const strength = getPasswordStrength();

  React.useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Password Generator</h3>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Generated Password</label>
          <div className="flex space-x-2">
            <button
              onClick={generatePassword}
              className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
              title="Generate new password"
            >
              <RefreshCw className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4 text-green-600" />
            </button>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg border-2 border-dashed border-gray-300 mb-2">
          <p className="font-mono text-lg break-all">{password}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Strength:</span>
            <span className={`font-semibold ${strength.color}`}>{strength.strength}</span>
          </div>
          {copied && <span className="text-sm text-green-600">Copied!</span>}
        </div>
        
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              strength.score <= 2 ? 'bg-red-500' :
              strength.score <= 3 ? 'bg-yellow-500' :
              strength.score <= 4 ? 'bg-blue-500' : 'bg-green-500'
            }`}
            style={{ width: `${(strength.score / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="4"
            max="50"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>4</span>
            <span>50</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Character Types:</h4>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-sm">Uppercase letters (A-Z)</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-sm">Lowercase letters (a-z)</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-sm">Numbers (0-9)</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-sm">Symbols (!@#$%^&*)</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={excludeSimilar}
              onChange={(e) => setExcludeSimilar(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-sm">Exclude similar characters (i, l, 1, L, o, 0, O)</span>
          </label>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Password Security Tips:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Use at least 12 characters for better security</p>
          <p>• Include a mix of uppercase, lowercase, numbers, and symbols</p>
          <p>• Avoid using personal information or common words</p>
          <p>• Use a unique password for each account</p>
          <p>• Consider using a password manager</p>
          <p>• Enable two-factor authentication when available</p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Password Strength Guide:</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p><span className="text-red-600 font-medium">Weak:</span> Less than 8 characters or limited character types</p>
          <p><span className="text-yellow-600 font-medium">Fair:</span> 8+ characters with some variety</p>
          <p><span className="text-blue-600 font-medium">Good:</span> 12+ characters with good variety</p>
          <p><span className="text-green-600 font-medium">Strong:</span> 12+ characters with all character types</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;