/**
 * ProgressBar 类，UI 组件。表示加载进度。
 */
class ProgressBar {
  /**
   * @constructor
   * @param {Object} options - 进度条的选项
   * @param {Object} options.container - 进度条的 DOM 父容器
   */
  constructor(options) {
    this._progress = 0.01;

    this.dom = document.createElement('div');
    this.dom.style.position = 'relative';
    this.dom.style.width = '100%';
    this.dom.style.height = '100%';
    this.dom.style.backgroundColor = '#282c30';
    this.dom.className = 'avw-loader';

    this.loadingDom = document.createElement('div');
    this.loadingDom.className = 'loader-inner line-scale';

    this.loadingDom.appendChild(document.createElement('div'));
    this.loadingDom.appendChild(document.createElement('div'));
    this.loadingDom.appendChild(document.createElement('div'));
    this.loadingDom.appendChild(document.createElement('div'));
    this.loadingDom.appendChild(document.createElement('div'));
    this.dom.appendChild(this.loadingDom);

    this.container = options.container || document.body;
    this.container.insertBefore(this.dom, this.container.firstChild);
  }

  get progress() {
    return this._progress;
  }

  set progress(progress) {
    if (!(typeof progress === 'number')) {
      return;
    }
    progress = Math.max(Math.min(progress, 1), 0.01);

    this._progress = progress;
    // this.loadingDom.style.right = `${15 + 70 * (1 - this.progress)}%`;
  }

  destroy() {
    this.container.removeChild(this.dom);
  }
}
