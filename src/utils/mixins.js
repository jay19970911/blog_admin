function isNumber(str = '') {
  if (str === '0' || str === 0) return true
  return str && !/\D/.test(str)
}

export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 4,
          },
        },
      },
    }
  },
  methods: {
    saveParams(payload = {}) {
      this.payload = { ...this.payload, ...payload }
      this.$router.push({ query: { ...this.$route.query, ...this.payload } })
    },
    // 保存列表参数
    changeImage(url, path, originData) {
      return url ? [{ ...originData, url: url, path: path }] : []
    },
    // 展示图片  form.cover = changeImage(d.cover_url, d.cover)
    submitImage(cover) {
      return cover && cover.length ? cover[0].path : ''
    },
    //多图上传数据处理=>只需要上传path,width,height字段
    handleMultiImage(val) {
      const handleArr = val.map((item) => {
        return {
          path: item.path,
          width: item.width,
          height: item.height,
        }
      })
      return handleArr
    },
    getPayload(defaultPayload) {
      const { query = {} } = this.$route
      const payload = {
        page: 1,
        per_page: 12,
        ...defaultPayload,
      }
      Object.entries(query).forEach(([key, value]) => {
        if (isNumber(value)) {
          payload[key] = Number(value)
        } else {
          payload[key] = value || ''
        }
      })
      return payload
    },
    formatSubmit(data = {}, { imgKeys = [] } = []) {
      const values = { ...data }
      imgKeys.forEach((key) => {
        if (values[key] && values[key].length) {
          values[key] = values[key][0].path
        } else {
          values[key] = ''
        }
      })
      return values
    },
    getSortOrder(columnKey) {
      const { order_field = "", order_type = "" } = this.$route.query;
      if (!order_field || columnKey !== order_field) return false;
      return order_type === "asc" ? "ascend" : "descend";
    },
  },
}
