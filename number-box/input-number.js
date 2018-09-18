Vue.component('input-number', {
    template: `
        <div class="input-number">
            <input
                type="text"
                v-model="currentValue"
            >
            <button
                @click="handleUp"
                :disabled="currentValue >= max"
            >
                + 
            </button>
            <button
                @click="handleDown"
                :disabled="currentValue <= min"
            >
                - 
            </button>
        </div>
    `,
    props:{
        max:{
            type: Number,
            default: Infinity
        },
        min:{
            type: Number,
            default: -Infinity
        },
        value:{
            default: 0
        }
    },
    data: function(){
        return {
            currentValue: this.value
        }
    },
    watch:{
        currentValue: function(val, pre){
            if(val === ''){
                this.currentValue = '';
            } else if(isValidateNumber(val)){
                val > this.max ? val = this.max : null;
                val < this.min ? val = this.min : null;
                this.currentValue = val;
            } else {
                this.currentValue = pre;
            }
            val = Number(val);
            if(!isNaN(val)){
                this.$emit('input', val);                
            }
        }
    },
    methods:{
        handleUp: function(val){
            this.currentValue++;
        },
        handleDown: function(val){
            this.currentValue--;
        }
    }
})

function isValidateNumber(str){
    //                 正负整数           正负小数          0.
    var numReg = /(^-?[1-9][0-9]*$)|(^-?[0-9]\.{1}\d+$)|(^\d\.?$)|(^-)/;
    return numReg.test(str);
}