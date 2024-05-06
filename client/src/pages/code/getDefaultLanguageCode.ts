const getDefaultLanguageCode = (language: string) => {
  switch (language) {
    case 'python':
      return "print('Hello World')\n";
    case 'cpp':
      return '#include <iostream>\n\nint main() {\n    std::cout << "Hello World";\n    return 0;\n}\n';
    case 'java':
      return '// Class Name Should be Main Only\n\nclass Main {\n    public static void main(String[] args) {\n\
      System.out.println("Hello World"); \n    }\n}\n';
    case 'javascript':
      return "console.log('Hello World')\n";
    default:
      return '';
  }
};

export default getDefaultLanguageCode;
