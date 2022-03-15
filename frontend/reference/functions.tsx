import React from 'react';
import './index.css';

export function Function1(props: {str: string}) {

	const noVowels = (phrase: string) => {
		return phrase
			.replaceAll('a','')
			.replaceAll('i','')
			.replaceAll('u','')
			.replaceAll('e','')
			.replaceAll('o','')
	}

	return (
		<h1>
			{noVowels(props.str)}
		</h1>
	)
}

export function Function2(props: {num1: number, num2: number}) {

	const multiply = (num1: number, num2: number) => {
		if (Number.isSafeInteger(num1) && Number.isSafeInteger(num2)) {
			return num1 * num2
		}

		throw TypeError('parameter to Function2 not SafeInteger')
	}

	return (
		<h1>
			{multiply(props.num1, props.num2)}
		</h1>
	)
}

export function Functions() {

	const renderF1 = (str: string) => {
		return <Function1 str={str}/>
	}

	const renderF2 = (a: number, b: number) => {
		return <Function2 num1={a} num2={b} />
	}

    return (
		<div className="functions">
			<div className="function1">
				{renderF1('AugoEides')}
			</div>
			<div className="function2">
				{renderF2(5,7)}
			</div>
		</div>
    )
}  