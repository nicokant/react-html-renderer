import { createElement as h } from 'react'
import renderer from 'react-test-renderer'
import { HTMLRenderer } from '.'

const html = `<h1>React</h1><h2>A JavaScript library for building user interfaces</h2><p><a href="#">Get Started</a></p>`

const components = {
  h1: props => h('h1', { 'data-replaced': true, ...props }),
}

test('should render the provided HTML', () => {
  const tree = renderer.create(h(HTMLRenderer, { html }))
  const json = tree.toJSON()

  expect(json).toEqual([
    { type: 'h1', props: {}, children: ['React'] },
    {
      type: 'h2',
      props: {},
      children: ['A JavaScript library for building user interfaces'],
    },
    {
      type: 'p',
      props: {},
      children: [
        { type: 'a', props: { href: '#' }, children: ['Get Started'] },
      ],
    },
  ])
})

test('should replace HTML elements using the components map', () => {
  const tree = renderer.create(h(HTMLRenderer, { html, components }))
  const json = tree.toJSON()

  expect(json).toEqual([
    {
      type: 'h1',
      props: { 'data-replaced': true, name: 'h1' },
      children: ['React'],
    },
    {
      type: 'h2',
      props: {},
      children: ['A JavaScript library for building user interfaces'],
    },
    {
      type: 'p',
      props: {},
      children: [
        { type: 'a', props: { href: '#' }, children: ['Get Started'] },
      ],
    },
  ])
})
