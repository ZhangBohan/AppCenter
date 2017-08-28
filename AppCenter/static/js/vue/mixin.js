var mixin = {
    methods: {
        showMessage: function (message) {
            this.message = message;
            var that = this;
            setTimeout(function () {
                that.message = null;
            }, 3000);
        },
        toggleLoading: function () {
            this.loading = !this.loading;
        },
        validateFileSize: function (file, width, height, callback) {
            //验证下上传图片尺寸
            var reader = new FileReader();
            var that = this;
            that.toggleLoading();

            reader.onload = function (e) {
                var data = e.target.result;
                var image = new Image();
                image.src = data;
                image.onload = function () {
                    console.log(image.width, image.height, image.naturalWidth, image.naturalHeight);
                    if (image.width !== width || image.height != height) {
                        alert('图片' + image.width + '*' + image.height + '不符合' + width + '*' + height + '要求');
                        that.toggleLoading();
                    } else {
                        var formData = new FormData();
                        formData.append('file', file);
                        that.toggleLoading();
                        callback(formData);
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    }
}
