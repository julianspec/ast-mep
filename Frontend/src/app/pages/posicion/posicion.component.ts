import { Component, OnInit } from '@angular/core';
import { Saldo, ConsultaMovimiento, CuentaBcra } from '../_model';
import { AlertService, CuentaBcraService, PosicionService } from '../_servicios';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
	selector: 'app-posicion',
	templateUrl: './posicion.component.html',
	styleUrls: ['./posicion.component.css']
})
export class PosicionComponent implements OnInit {

	cuentas: Saldo[];
	loading = false;
	movimiento: ConsultaMovimiento;

	constructor(private router: Router, private posicionService: PosicionService, private alertService: AlertService) { }

	ngOnInit(): void {
		this.loading = true;
		this.posicionService.getPosicion()
			.pipe(first())
			.subscribe(
				(cuentas) => {
					this.cuentas = cuentas
					this.loading = false;
				},
				error => {
					//this.alertService.error(error.err);
					this.loading = false;
				}
			);
	}

	consultaMovimientos(cuenta) {
		this.router.navigate(['/movimientos'], { state: { cuenta } });
	}

	consultaReserva(cuenta) {
		this.router.navigate(['/reserva'], { state: { cuenta } });
	}

	ConsultarSaldo(cuenta: Saldo) {
		this.posicionService.getSaldo(cuenta.cuenta)
			.pipe(first())
			.subscribe(
				(saldo) => {

					cuenta.saldo = saldo.saldo;
					cuenta.saldoDisponibleReal = saldo.saldoDisponibleReal;
					cuenta.saldoReservado = saldo.saldoReservado;
					cuenta.horaConsulta = saldo.horaConsulta;

					this.UpdateItem(cuenta);
				},
				error => {
				}
			);
	}

	UpdateItem(newItem: Saldo) {
		let updateItem = this.cuentas.find(this.findIndexToUpdate, newItem.cuenta);
		let index = this.cuentas.indexOf(updateItem);
		this.cuentas[index] = newItem;
	}

	findIndexToUpdate(newItem) {
		return newItem.cuenta === this;
	}

}
