export interface SplitTextOptions {
  type?: 'words' | 'chars' | 'lines';
  className?: string;
  preserveSpaces?: boolean;
}

export interface SplitTextResult {
  chars?: HTMLElement[];
  words?: HTMLElement[];
  lines?: HTMLElement[];
  revert: () => void;
}

export class SplitText {
  private element: HTMLElement;
  private originalHTML: string;
  private splitElements: HTMLElement[] = [];

  constructor(element: HTMLElement | string, private options: SplitTextOptions = {}) {
    this.element = typeof element === 'string' ?
      document.querySelector(element) as HTMLElement : element;

    if (!this.element) {
      throw new Error('Element not found');
    }

    this.originalHTML = this.element.innerHTML;
    this.split();
  }

  private split(): SplitTextResult {
    const { type = 'words', className = '', preserveSpaces = true } = this.options;

    const text = this.element.textContent || '';
    this.element.innerHTML = '';

    if (type === 'chars') {
      return this.splitByChars(text, className, preserveSpaces);
    } else if (type === 'words') {
      return this.splitByWords(text, className);
    } else if (type === 'lines') {
      return this.splitByLines(text, className);
    }

    return { revert: this.revert.bind(this) };
  }

  private splitByChars(text: string, className: string, preserveSpaces: boolean): SplitTextResult {
    const chars: HTMLElement[] = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement('span');

      if (char === ' ' && preserveSpaces) {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = char;
      }

      span.style.display = 'inline-block';
      if (className) span.className = className;

      this.element.appendChild(span);
      this.splitElements.push(span);
      chars.push(span);
    }

    return { chars, revert: this.revert.bind(this) };
  }

  private splitByWords(text: string, className: string): SplitTextResult {
    const words: HTMLElement[] = [];
    const wordArray = text.split(/(\s+)/);

    wordArray.forEach((word, index) => {
      const span = document.createElement('span');

      if (word.trim() === '') {
        span.innerHTML = word.replace(/ /g, '&nbsp;');
      } else {
        span.textContent = word;
      }

      span.style.display = 'inline-block';
      if (className) span.className = className;

      this.element.appendChild(span);
      this.splitElements.push(span);

      if (word.trim() !== '') {
        words.push(span);
      }
    });

    return { words, revert: this.revert.bind(this) };
  }

  private splitByLines(text: string, className: string): SplitTextResult {
    const lines: HTMLElement[] = [];
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.width = getComputedStyle(this.element).width;

    document.body.appendChild(tempDiv);

    const lineBreaks = this.getLineBreaks(tempDiv);
    document.body.removeChild(tempDiv);

    const words = text.split(' ');
    const currentLine = '';
    let wordIndex = 0;

    lineBreaks.forEach((breakIndex, lineIndex) => {
      const lineWords = words.slice(wordIndex, breakIndex + 1);
      const span = document.createElement('span');
      span.textContent = lineWords.join(' ');
      span.style.display = 'block';
      if (className) span.className = className;

      this.element.appendChild(span);
      this.splitElements.push(span);
      lines.push(span);

      wordIndex = breakIndex + 1;
    });

    return { lines, revert: this.revert.bind(this) };
  }

  private getLineBreaks(element: HTMLElement): number[] {
    const breaks: number[] = [];
    const words = (element.textContent || '').split(' ');
    let currentTop = 0;

    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      element.appendChild(span);

      const rect = span.getBoundingClientRect();
      if (currentTop === 0) {
        currentTop = rect.top;
      } else if (rect.top > currentTop) {
        breaks.push(index - 1);
        currentTop = rect.top;
      }
    });

    breaks.push(words.length - 1);
    return breaks;
  }

  revert(): void {
    this.element.innerHTML = this.originalHTML;
    this.splitElements = [];
  }

  get chars(): HTMLElement[] {
    return this.splitElements;
  }

  get words(): HTMLElement[] {
    return this.splitElements;
  }

  get lines(): HTMLElement[] {
    return this.splitElements;
  }
}