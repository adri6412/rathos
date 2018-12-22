Graphics.playVideo = function(src) {
    this._video.src = src;
    this._video._isLoading = true; // added code
    this._video.onloadeddata = this._onVideoLoad.bind(this);
    this._video.onerror = this._onVideoError.bind(this);
    this._video.onended = this._onVideoEnd.bind(this);
    this._video.load();
};

Graphics._updateVisibility = function(videoVisible) {
    this._video._isLoading = false; // added code
    this._video.style.opacity = videoVisible ? 1 : 0;
    this._canvas.style.opacity = videoVisible ? 0 : 1;
};

Graphics._isVideoVisible = function() {
    return this._video._isLoading || this._video.style.opacity > 0;
};

 
