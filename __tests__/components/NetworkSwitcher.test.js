import React from 'react'

import { mount } from 'enzyme'

import NetworkSwitcher from '../../src/app/components/NetworkSwitcher'

const setup = () => {
  const props = {
    selectedNetworkId: 'MainNet',
    networks: {
      MainNet: { name: 'MainNet', url: 'http://api.wallet.cityofzion.io', canDelete: false },
      TestNet: { name: 'TestNet', url: 'http://testnet-api.wallet.cityofzion.io', canDelete: false },
      CoZTestNet: { name: 'CoZ TestNet', url: 'http://coz-privatenet.herokuapp.com/', canDelete: false },
    },
    setNetwork: jest.fn(),
    getBalance: jest.fn(),
  }
  const wrapper = mount(<NetworkSwitcher { ...props } />)

  return {
    wrapper,
  }
}

describe('NetworkSwitch', () => {
  test('renders without crashing', done => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    done()
  })

  test('correctly renders MainNet initially', () => {
    const { wrapper } = setup()
    wrapper.find('.dropDownButton').simulate('click')
    const networkSelectorElement = wrapper.find('.networkOptionButton').at(0)

    expect(networkSelectorElement.contains(<div className='networkNavigationOptionSelected' />)).toBe(true)
  })

  test('switches to the correct network when chosen from the dropdown', async () => {
    const { wrapper } = setup()

    const instance = wrapper.instance()
    wrapper.find('.dropDownButton').simulate('click')
    let networkSelectorElement = wrapper.find('.networkOptionButton').at(1)
    networkSelectorElement.simulate('click')

    expect(instance.props.setNetwork).toHaveBeenCalledWith('TestNet')

    networkSelectorElement = wrapper.find('.networkOptionButton').at(0)
    networkSelectorElement.simulate('click')

    expect(instance.props.setNetwork).toHaveBeenCalledWith('MainNet')
  })
})
