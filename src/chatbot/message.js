import { fakeMessages } from './fake-messages'

export const messageService = {
    createMessage
}

function createMessage (value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(value.toLowerCase()=='привет' || value.toLowerCase()=='здраствуйте' || value.toLowerCase()=='добрый день' ){
                resolve(
                    {
                        'type': 'text',
                        'text': 'Добрый день!!',
                        'disableInput': false
                    },
                )
            }
            if(value.toLowerCase()=='как оплатить кредит' ){
                resolve(
                    {
                        'type': 'text',
                        'text': 'Лучше картой можно векселями',
                        'disableInput': false
                    },
                )
            }
            if(value.toLowerCase()=='сколько я должен' ){
                resolve(
                    {
                        'type': 'text',
                        'text': 'Много',
                        'disableInput': false
                    },
                )
            }
            if(value.toLowerCase()=='мой долг' ){
                resolve(
                    {
                        'type': 'button',
                        'text': 'Выберите вариант',
                        'options': [
                            {
                                'text': 'How to create a menu',
                                'value': 'https://google.com',
                                'action': 'url'
                            },
                            {
                                'text': 'How to add a submenu to a menu',
                                'value': 'https://google.com',
                                'action': 'url'
                            },
                            {
                                'text': "API",
                                'value': 'http://localhost:1901',
                                'action': 'http://localhost:1901'
                            }
                        ],
                        'disableInput': true
                    },
                )
            }

            //let randomNumber = Math.floor(Math.random() * fakeMessages.length)

        }, 1000)
    })
}