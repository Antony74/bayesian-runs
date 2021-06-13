
function wrapUnary(fn)
{
	return function(a)
	{
		if (typeof(a) === 'number')
		{
			return fn(a);
		}
		else if (Array.isArray(a))
		{
			var arrOut = Array(a.length);
			for (var n = 0; n < a.length; ++n)
			{
				arrOut[n] = fn(a[n]);
			}
			return arrOut;
		}
		else
		{
			throw 'Not supported';
		}
	};
}

function wrapBinary(fn)
{
	return function(a, b)
	{
		var arrOut, n;

		if (typeof(a) === 'number' && typeof(b) === 'number')
		{
			return fn(a,b);
		}
		else if (typeof(a) === 'number' && Array.isArray(b))
		{
			arrOut = Array(b.length);
			for (n = 0; n < b.length; ++n)
			{
				arrOut[n] = fn(a, b[n]);
			}
			return arrOut;
		}
		else if (Array.isArray(a) && typeof(b) === 'number')
		{
			arrOut = Array(a.length);
			for (n = 0; n < a.length; ++n)
			{
				arrOut[n] = fn(a[n], b);
			}
			return arrOut;
		}
		else if (Array.isArray(a) && Array.isArray(b))
		{
			if (a.length !== b.length)
			{
				throw 'Array lengths differ';
			}

			arrOut = Array(a.length);
			for (n = 0; n < a.length; ++n)
			{
				arrOut[n] = fn(a[n], b[n]);
			}
			return arrOut;
		}
		else
		{
			throw 'Not supported';
		}
	};
}

// Define various wrappers
var div = wrapBinary( function(a,b) {return a/b;} );
var mul = wrapBinary( function(a,b) {return a*b;} );
var pow = wrapBinary( Math.pow );

var neg  = wrapUnary( function(a) {return -a;} );
var exp  = wrapUnary( Math.exp );

function factorial(x)
{
	var f = 1;
	for (var n = 1; n <= x; ++n)
	{
		f *= n;
	}

	return f;
}

function sum(arr)
{
	var result = 0;

	for (var n = 0; n < arr.length; ++n)
	{
		result += arr[n];
	}

	return result;
}

function possion(x, lambda)
{
	// Only do it this way for very small values of x
	return div(
				mul( exp( neg(lambda)),
				     pow(lambda, x)),
				factorial(x));
}

function bayes(likelihoods, priors)
{
	var lp = mul(likelihoods, priors);
	var evidence = sum(lp);
	return div(lp, evidence);
}

// Choose a sample of possible lambda
var lambda = [];
for (var n = 0.1; n <= 20; n += 0.1)
{
	lambda.push(n);
}

var N = lambda.length;

// Choose some priors
var priors = Array(N);
priors.fill(1/N);

// Calculate likelihoods
var likelihoods = possion(2, lambda);

// Calculate posteriors
var posteriors = bayes(likelihoods, priors);

function p(t)
{
	var possibities = exp(neg(mul(lambda, t)));
	return sum(mul(possibities, posteriors));
}

console.log('p(1.72)=' + p(1.72));


