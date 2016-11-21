const svg = d3.select('svg')
const margin = {top: 20, right: 20, bottom: 30, left: 50}
const width = +svg.attr('width') - margin.left - margin.right
const height = +svg.attr('height') - margin.top - margin.bottom
const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const parseTime = d3.timeParse('%d-%b-%y')

const x = d3.scaleTime()
  .rangeRound([0, width])

const y = d3.scaleLinear()
  .rangeRound([height, 0])

const line = d3.line()
  .x((d) => x(d.date))
  .y((d) => y(d.close))

d3.tsv('/data/example.tsv', (d) => {
  d.date = parseTime(d.date)
  d.close = +d.close
  return d
}, (error, data) => {
  if (error) throw error

  x.domain(d3.extent(data, (d) => d.date))
  y.domain(d3.extent(data, (d) => d.close))

  g.append('g')
    .attr('class', 'axis axis--x')
    //.attr('transform', 'translate(0,' + height + ')')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))

  g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .style('text-anchor', 'end')
    .text('Price ($)')

  g.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', line)
})

