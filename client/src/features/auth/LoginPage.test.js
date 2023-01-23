import {render, screen} from '@testing-library/react'
import LoginPage from './LoginPage'

test('On initial render username and password fields are empty', () => {
    render(<LoginPage />)

    screen.debug()
})