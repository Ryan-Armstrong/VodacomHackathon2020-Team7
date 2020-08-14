Component({
  mixins: [],
  data: {},
  props: {
    roundedCorners: false,
    onButtonLeft:() => {},
    onButtonRight:() => {},
    buttonLeftText:'',
    buttonRightText:'',
    identifier:'',
    class: ''
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onButtonLeft(e){
      this.props.onButtonLeft(e);
    },
    onButtonRight(e){
      this.props.onButtonRight(e);
    }
  },
});
