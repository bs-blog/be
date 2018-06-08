const {numToTimeFormat, timestampToDateFormat} = require('../lib/time')

describe('numToTimeFormat', ()=>{
    beforeAll(()=>{
    })

    it('numToTimeFormat: 01:01', ()=>{
        const result = numToTimeFormat(61)
        expect(result).toBe('01:01')
    })

    it('numToTimeFormat: 00:00', ()=>{
        const result = numToTimeFormat(0)
        expect(result).toBe('00:00')
    })
})


describe('timestampToDateFormat', ()=>{
    it('timestampToDateFormat: 01:01', ()=>{
        const result = timestampToDateFormat(1509926400000)
        expect(result).toBe('2017-11-6')
    })
})